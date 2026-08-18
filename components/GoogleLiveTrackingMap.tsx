import React, { useState, useEffect, useRef, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
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
}

// Inner component for Route Computation and Polylines
const RoutePolylineRenderer: React.FC<{
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  onRouteCalculated?: (route: NavigationRoute) => void;
}> = ({ origin, destination, onRouteCalculated }) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylineRef = useRef<any | null>(null);

  useEffect(() => {
    if (!map) return;

    // Use Maps Routes Library if available
    if (routesLib && (routesLib as any).Route) {
      try {
        (routesLib as any).Route.computeRoutes({
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: 'DRIVING',
          fields: ['path', 'distanceMeters', 'durationMillis', 'viewport']
        }).then(({ routes }: { routes: any[] }) => {
          if (routes && routes[0]) {
            if (polylineRef.current) {
              polylineRef.current.setMap(null);
            }
            const polylines = routes[0].createPolylines();
            if (polylines && polylines[0]) {
              polylines[0].setOptions({
                strokeColor: '#f97316',
                strokeWeight: 5,
                strokeOpacity: 0.85
              });
              polylines[0].setMap(map);
              polylineRef.current = polylines[0];
            }
            if (routes[0].viewport) {
              map.fitBounds(routes[0].viewport);
            }
          }
        }).catch((err: any) => {
          console.warn('[RoutePolylineRenderer] computeRoutes fallback:', err);
        });
      } catch (e) {
        console.warn('[RoutePolylineRenderer] routesLib error:', e);
      }
    } else {
      // Direct polyline fallback
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
      const g = (window as any).google;
      if (g && g.maps) {
        const line = new g.maps.Polyline({
          path: [origin, destination],
          geodesic: true,
          strokeColor: '#f97316',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: map
        });
        polylineRef.current = line;

        const bounds = new g.maps.LatLngBounds();
        bounds.extend(origin);
        bounds.extend(destination);
        map.fitBounds(bounds);
      }
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, routesLib, origin.lat, origin.lng, destination.lat, destination.lng]);

  return null;
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
  const [selectedMarker, setSelectedMarker] = useState<'user' | 'provider' | null>(null);
  const [routeInfo, setRouteInfo] = useState<NavigationRoute | null>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState<boolean>(false);

  // Effective provider coordinates (prefer live GPS stream from Firestore if available)
  const currentProviderLat = liveWorkerLoc?.lat ?? providerLat;
  const currentProviderLng = liveWorkerLoc?.lng ?? providerLng;
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

  // Real-time route computation
  useEffect(() => {
    if (hasProviderCoords && currentProviderLat && currentProviderLng) {
      setIsCalculatingRoute(true);
      mapsService.computeRoute(
        { lat: userLat, lng: userLng },
        { lat: currentProviderLat, lng: currentProviderLng }
      ).then((route) => {
        if (route) {
          setRouteInfo(route);
        }
      }).finally(() => {
        setIsCalculatingRoute(false);
      });
    }
  }, [userLat, userLng, currentProviderLat, currentProviderLng, hasProviderCoords]);

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

  // Center coordinate
  const centerLat = hasProviderCoords && currentProviderLat ? (userLat + currentProviderLat) / 2 : userLat;
  const centerLng = hasProviderCoords && currentProviderLng ? (userLng + currentProviderLng) / 2 : userLng;

  // If no Google Maps API Key is provided yet, fallback smoothly to LeafletMap so the user experience is uninterrupted
  if (!hasGoogleMapsKey) {
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
        />
        {/* Live GPS badge indicator */}
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
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: centerLat, lng: centerLng }}
          defaultZoom={12}
          mapTypeId={mapType}
          disableDefaultUI={true}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {/* User Marker ("Ma Position") */}
          <AdvancedMarker 
            position={{ lat: userLat, lng: userLng }} 
            onClick={() => setSelectedMarker('user')}
            title={userName}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping" />
              <div className="w-6 h-6 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg text-white">
                <Locate className="w-3.5 h-3.5" />
              </div>
            </div>
          </AdvancedMarker>

          {/* Provider Marker */}
          {hasProviderCoords && currentProviderLat && currentProviderLng && (
            <AdvancedMarker 
              position={{ lat: currentProviderLat, lng: currentProviderLng }}
              onClick={() => setSelectedMarker('provider')}
              title={providerName}
            >
              <div className="relative flex flex-col items-center cursor-pointer group">
                {/* Live Radar animation if active */}
                {isLiveActive && (
                  <div className="absolute -top-1 w-10 h-10 bg-emerald-500/40 rounded-full animate-ping" />
                )}
                
                {/* Avatar Pin */}
                <div className={`w-10 h-10 rounded-2xl overflow-hidden border-2 shadow-xl flex items-center justify-center bg-white transition-transform group-hover:scale-110 ${
                  isLiveActive ? 'border-emerald-500 ring-2 ring-emerald-400' : 'border-orange-500'
                }`}>
                  {providerAvatar ? (
                    <img 
                      src={providerAvatar} 
                      alt={providerName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-600 text-white flex items-center justify-center font-black text-xs">
                      {providerName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Status Pill on marker */}
                <div className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white shadow-md flex items-center gap-1 ${
                  isLiveActive ? 'bg-emerald-600' : 'bg-orange-600'
                }`}>
                  {isLiveActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  <span>{isLiveActive ? 'En direct' : providerCity || 'Prestataire'}</span>
                </div>
              </div>
            </AdvancedMarker>
          )}

          {/* Route & Directions Polyline */}
          {hasProviderCoords && currentProviderLat && currentProviderLng && (
            <RoutePolylineRenderer
              origin={{ lat: userLat, lng: userLng }}
              destination={{ lat: currentProviderLat, lng: currentProviderLng }}
            />
          )}

          {/* Info Window on Selected Marker */}
          {selectedMarker === 'provider' && hasProviderCoords && currentProviderLat && currentProviderLng && (
            <InfoWindow
              position={{ lat: currentProviderLat, lng: currentProviderLng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2 text-slate-800 font-sans max-w-[200px]">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">{providerName}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  {providerCategory} • {providerCity || 'Abidjan'}
                </div>
                {routeInfo && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-black text-orange-600">
                    <span>{routeInfo.formattedDistance}</span>
                    <span>~{routeInfo.formattedDuration}</span>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}

          {selectedMarker === 'user' && (
            <InfoWindow
              position={{ lat: userLat, lng: userLng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-1.5 text-slate-800 font-sans text-xs font-bold flex items-center gap-1">
                <Locate className="w-3.5 h-3.5 text-blue-600" />
                <span>{userName}</span>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

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
