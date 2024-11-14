import React, { useEffect, useRef, useState } from 'react'

const AMapComponent = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [pois, setPois] = useState([])

  useEffect(() => {
    // 初始化地图
    const mapInstance = new window.AMap.Map(mapContainerRef.current, {
      resizeEnable: true,
      zoom: 15
    })
    setMap(mapInstance)

    // 添加地图插件
    window.AMap.plugin(['AMap.Geolocation', 'AMap.PlaceSearch'], () => {
      const geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true, //  是否使用高精度定位，默认:true
        timeout: 10000, //  超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //  定位结果缓存0毫秒，默认：0
        convert: true, //  自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //  显示定位按钮，默认：true
        buttonPosition: 'RB', //  定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new window.AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })

      mapInstance.addControl(geolocation)
      geolocation.getCurrentPosition()
      window.AMap.event.addListener(geolocation, 'complete', onComplete) // 返回定位信息
      window.AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
    })

    // 定位成功回调
    function onComplete(data) {
      const position = [data.position.getLng(), data.position.getLat()]
      addMarker(position)
      searchNearby(position)
    }

    // 定位失败回调
    function onError(data) {
      console.error('定位失败', data)
    }

    // 添加标记
    function addMarker(position) {
      if (marker) {
        marker.setPosition(position)
      } else {
        const newMarker = new window.AMap.Marker({
          position,
          draggable: true,
          map: mapInstance
        })
        setMarker(newMarker)

        newMarker.on('dragend', (e) => {
          searchNearby([e.lnglat.getLng(), e.lnglat.getLat()])
        })
      }
      mapInstance.setCenter(position)
    }

    // 搜索附近地标建筑
    function searchNearby(position) {
      const placeSearch = new window.AMap.PlaceSearch({
        type: '建筑物',
        pageSize: 10,
        pageIndex: 1,
        city: '全国' // 可选值：城市名（中文或中文全拼）、citycode、adcode
      })

      placeSearch.searchNearBy('', position, 1000, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          setPois(result.poiList.pois)
        } else {
          console.error('搜索失败', result)
        }
      })
    }
  }, [marker])

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }}></div>
      <div>
        <h5>附近地标建筑</h5>
        <ul>
          {pois.map((poi) => (
            <li key={poi.id}>{poi.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AMapComponent
