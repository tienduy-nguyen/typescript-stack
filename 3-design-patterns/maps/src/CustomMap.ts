export interface Mappable{
  location:{
    lat: number;
    lng: number;
  }
  markerContent(): string;
  color: string;
}
export class CustomMap{
  private googleMap: google.maps.Map;
  constructor(divId: string){
    this.googleMap = new this.googleMap.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    })
  }
  addMarker(mappable: Mappable): void{
    const marker = new this.googleMap.maps.Marker({
      map: this.googleMap,
      position:{
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });
    marker.addListener('click', ()=>{
      const infoWindow = new this.googleMap.maps.InfoWindow({
        content: mappable.markerContent()
      });
      infoWindow.open(this.googleMap, marker)
    })
  }

}