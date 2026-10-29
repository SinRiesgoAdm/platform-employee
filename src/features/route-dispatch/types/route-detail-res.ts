export interface RouteInfo {
    routestart: string;
    routearrival: string;
    routedescrip: string;
    travelkilo: number;
    traveltime: string;
    routeusual: string;
    routeother: string;
    routestatus: string;
    routestatdesc: string;
    routemap: string | null;
}

export interface RouteToll {
    tollname: string;
    kiloonroute: string;
    tolltown: string;
    tolladdress: string;
    tollservices: string;
}

export interface RouteTypeZone {
    zonename: string;
    velcarga: string;
    velnocarga: string;
    velnorma: string;
}

export interface RouteControlPoint {
    controlname: string;
    pointtype: string;
    kiloonroute: string;
    controltown: string;
    controladdress: string;
    controlservices: string;
}

export interface RouteAssistPoint {
    assisttype: string;
    assistname: string;
    assisttown: string;
    assistaddress: string;
    assistphone: string;
}

export interface RouteCriticPoint {
    critictype: string;
    kiloonroute: string;
    criticorient: string;
    criticadvices: string;
}

export interface RouteDetailResponse {
    routeInfo: RouteInfo;
    tolls: RouteToll[];
    typeZones: RouteTypeZone[];
    controlPoints: RouteControlPoint[];
    assistPoints: RouteAssistPoint[];
    criticPoints: RouteCriticPoint[];
}
