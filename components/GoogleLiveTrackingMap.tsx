import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layers, Navigation, Compass, MapPin, Radio, Zap, Clock, ShieldCheck, Locate } from 'lucide-react';
import { mapsService, GOOGLE_MAPS_API_KEY, hasGoogleMapsKey } from '../services/mapsService';
import { LeafletMap } from './LeafletMap';
import { WorkerLiveLocation, NavigationRoute } from '../types';

interface GoogleLiveTrackingMapProps {
  userLat: number;
  userLng: number;
  userName?: string;
  workerId?: string;
  providerLat: number | null;
  providerLng: number | null;
  providerName?: string;
  providerCity?: string;
  providerPhone?: string;
  providerAvatar?: string;
  providerCategory?: string;
  isSearching?: boolean;
  onOpenNavigation?: () => void;
  pathHistory?: { lat: number; lng: number; timestamp: number }[];
}

// Script loader helper for Google Maps JS API
let googleMapsScriptPromise: Promise<void> | null = null;
const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  const g = (window as any).google;
  if (g && g.maps) return Promise.resolve();

  if (!googleMapsScriptPromise) {
    googleMapsScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', (e) => reject(e));
        if ((window as any).google?.maps) resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry,marker&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (err) => {
        console.warn('[GoogleLiveTrackingMap] Error loading Google Maps script:', err);
        reject(err);
      };
      document.head.appendChild(script);
    });
  }
  return googleMapsScriptPromise;
};

const GoogleLiveTrackingMap: React.FC<GoogleLiveTrackingMapProps> = ({
  userLat,
  userLng,
  userName = 'Ma Position',
  workerId,
  providerLat,
  providerLng,
  providerName = 'Prestataire',
  providerCity,
  providerPhone,
  providerAvatar,
  providerCategory = 'Travailleur',
  isSearching = false,
  onOpenNavigation
}) => {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [liveWorkerLoc, setLiveWorkerLoc] = useState<WorkerLiveLocation | null>(null);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [routeInfo, setRouteInfo] = useState<NavigationRoute | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [scriptError, setScriptError] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const providerMarkerRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const trailPolylineRef = useRef<any>(null);

  // Effective provider coordinates (prefer live GPS stream from Firestore if available)
  const currentProviderLat = liveWorkerLoc?.lat ?? providerLat;
  const currentProviderLng = liveWorkerLoc?.lng ?? providerLng;
  const effectivePathHistory = liveWorkerLoc?.pathHistory ?? pathHistory;
  const hasProviderCoords = currentProviderLat !== null && currentProviderLng !== null;

  // Real-time Firestore subscription to worker live location
  useEffect(() => {
    if (!workerId && !providerPhone) return;
    const lookupId = workerId || providerPhone || '';
    
    const unsubscribe = mapsService.subscribeWorkerLiveLocation(lookupId, (liveData) => {
      if (liveData) {
        setLiveWorkerLoc(liveData);
        setIsLiveActive(liveData.isLiveTracking && (Date.now() - liveData.lastUpdated < 300000));
      }
    });

    return () => unsubscribe();
  }, [workerId, providerPhone]);

  // Compute route summary
  useEffect(() => {
    if (hasProviderCoords && currentProviderLat && currentProviderLng) {
      mapsService.computeRoute(
        { lat: userLat, lng: userLng },
        { lat: currentProviderLat, lng: currentProviderLng }
      ).then((route) => {
        if (route) {
          setRouteInfo(route);
        }
      }).catch(() => {});
    }
  }, [userLat, userLng, currentProviderLat, currentProviderLng, hasProviderCoords]);

  // Load Google Maps script
  useEffect(() => {
    if (!hasGoogleMapsKey) return;
    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY)
      .then(() => setIsScriptLoaded(true))
      .catch((e) => {
        console.warn('[GoogleLiveTrackingMap] Failed to load script, falling back to Leaflet:', e);
        setScriptError(true);
      });
  }, []);

  // Initialize and update Google Map
  useEffect(() => {
    if (!isScriptLoaded || scriptError || !mapContainerRef.current) return;
    const g = (window as any).google;
    if (!g || !g.maps) return;

    const centerLat = hasProviderCoords && currentProviderLat ? (userLat + currentProviderLat) / 2 : userLat;
    const centerLng = hasProviderCoords && currentProviderLng ? (userLng + currentProviderLng) / 2 : userLng;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new g.maps.Map(mapContainerRef.current, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 13,
        mapTypeId: mapType,
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: false,
        streetViewControl: false
      });
    } else {
      mapInstanceRef.current.setMapTypeId(mapType);
    }

    const map = mapInstanceRef.current;

    // User Marker
    if (!userMarkerRef.current) {
      userMarkerRef.current = new g.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map,
        title: userName,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#2563eb',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
    } else {
      userMarkerRef.current.setPosition({ lat: userLat, lng: userLng });
    }

    // Provider Marker
    if (hasProviderCoords && currentProviderLat && currentProviderLng) {
      if (!providerMarkerRef.current) {
        providerMarkerRef.current = new g.maps.Marker({
          position: { lat: currentProviderLat, lng: currentProviderLng },
          map,
          title: providerName,
          icon: {
            path: g.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: isLiveActive ? '#10b981' : '#f97316',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });
      } else {
        providerMarkerRef.current.setPosition({ lat: currentProviderLat, lng: currentProviderLng });
        providerMarkerRef.current.setIcon({
          path: g.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: isLiveActive ? '#10b981' : '#f97316',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        });
      }

      // Draw route / polyline
      if (!polylineRef.current) {
        polylineRef.current = new g.maps.Polyline({
          path: [
            { lat: userLat, lng: userLng },
            { lat: currentProviderLat, lng: currentProviderLng }
          ],
          geodesic: true,
          strokeColor: '#f97316',
          strokeOpacity: 0.85,
          strokeWeight: 4,
          map
        });
      } else {
        polylineRef.current.setPath([
          { lat: userLat, lng: userLng },
          { lat: currentProviderLat, lng: currentProviderLng }
        ]);
      }

      // Draw real-time moving trail (breadcrumbs)
      if (effectivePathHistory && effectivePathHistory.length > 1) {
        const trailGoogleCoords = effectivePathHistory.map(p => ({ lat: p.lat, lng: p.lng }));
        if (!trailPolylineRef.current) {
          trailPolylineRef.current = new g.maps.Polyline({
            path: trailGoogleCoords,
            geodesic: true,
            strokeColor: '#10b981',
            strokeOpacity: 0.95,
            strokeWeight: 5,
            map
          });
        } else {
          trailPolylineRef.current.setPath(trailGoogleCoords);
        }
      }

      // Fit bounds
      const bounds = new g.maps.LatLngBounds();
      bounds.extend({ lat: userLat, lng: userLng });
      bounds.extend({ lat: currentProviderLat, lng: currentProviderLng });
      if (effectivePathHistory && effectivePathHistory.length > 0) {
        effectivePathHistory.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
      }
      map.fitBounds(bounds);
    }
  }, [isScriptLoaded, scriptError, userLat, userLng, currentProviderLat, currentProviderLng, hasProviderCoords, mapType, isLiveActive, effectivePathHistory]);

  // Open external Google Maps turn-by-turn navigation
  const handleOpenGoogleNavigation = () => {
    if (hasProviderCoords && currentProviderLat && currentProviderLng) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${currentProviderLat},${currentProviderLng}&travelmode=driving`;
      window.open(url, '_blank');
    } else if (providerCity) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${encodeURIComponent(providerCity + ', Côte d\'Ivoire')}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  // If no Google Maps API Key is provided or script failed, fallback cleanly to LeafletMap
  if (!hasGoogleMapsKey || scriptError) {
    return (
      <div className="relative w-full h-full">
        <LeafletMap
          userLat={userLat}
          userLng={userLng}
          userName={userName}
          providerLat={currentProviderLat}
          providerLng={currentProviderLng}
          providerName={providerName}
          providerCity={providerCity}
          isSearching={isSearching}
          pathHistory={effectivePathHistory}
        />
        {isLiveActive && (
          <div className="absolute top-4 left-4 z-[400] bg-emerald-600/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Position en direct</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex items-center justify-between pointer-events-none">
        {/* Live Status Pill */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
          <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-emerald-400 animate-ping' : 'bg-orange-400'}`} />
          <span className="text-[10px] font-black uppercase tracking-wider">
            {isLiveActive ? 'Suivi en direct actif' : (providerCity ? `Zone : ${providerCity.toUpperCase()}` : 'Carte FILANT°225')}
          </span>
          {routeInfo && (
            <span className="text-[10px] font-bold text-emerald-400 border-l border-white/20 pl-2">
              {routeInfo.formattedDistance} ({routeInfo.formattedDuration})
            </span>
          )}
        </div>

        {/* Map Type Switcher (Plan / Satellite) */}
        <div className="pointer-events-auto flex items-center bg-slate-900/90 backdrop-blur-md rounded-2xl p-1 border border-white/10 shadow-xl">
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition-all ${
              mapType === 'roadmap' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Plan
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase transition-all ${
              mapType === 'satellite' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Floating GPS Navigation Button */}
      <button
        onClick={handleOpenGoogleNavigation}
        className="absolute bottom-4 left-4 z-[400] flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 px-4 py-2.5 rounded-2xl border border-orange-400 text-xs font-black uppercase tracking-wider text-white shadow-2xl transition-all cursor-pointer"
        title="Ouvrir l'itinéraire Google Maps"
      >
        <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Itinéraire GPS ↗</span>
      </button>
    </div>
  );
};

export default GoogleLiveTrackingMap;
export { GoogleLiveTrackingMap };
