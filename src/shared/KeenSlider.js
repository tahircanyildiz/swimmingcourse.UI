import React, { useState, useEffect } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import KeenSliderItem from "./KeenSliderItem"
import { get } from "../services/apiHandler"
import toast from "react-hot-toast"
import KeenSliderLandingpage from "./KeenSliderLandingpage"

export default function KeenSlider({ landingPage }) {
  const [data, setData] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemCount, setItemCount] = useState(2)
  const [windowWidth, setWindowWidth] = useState(null);
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    loop: true,
    slides: {
      origin: "center",
      perView: itemCount,
      spacing: 10,
    },
  })

  const [LandingpageSliderRef, landingPageInstanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    loop: true,
    slides: {
      origin: "center",
      perView: 1,
      spacing: 10,
    },
    dragStart() { // Otomatik dönüş sırasında sürükleme işlemini durdurun
      clearInterval(interval);
    },
    dragEnd() { // Sürükleme bittiğinde otomatik dönüşü yeniden başlatın
      startAutoPlay();
    }

  })

  useEffect(() => {
    get('/api/users/getonlyteachers').then(response => setData(response)).catch((error) => {
      toast.error('GET İstek sırasında bir sorun oluştu daha sonra tekrar deneyin.')
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  },[])

  useEffect(() => {
    if (windowWidth && windowWidth < 1024 && loaded) {
      setItemCount(1)
    }else{
        setItemCount(2)
    }
  }, [windowWidth, loaded]);

  // Otomatik dönüş için bir interval
  let interval;

  // Otomatik dönüşü başlatan fonksiyon
  const startAutoPlay = () => {
    if (landingPageInstanceRef) {
      interval = setInterval(() => {
        landingPageInstanceRef?.current?.next();
      }, 3000); // 3 saniyede bir otomatik geçiş yapacak şekilde ayarlayabilirsiniz
    }

  };

  useEffect(() => {
    if (loaded) {
      startAutoPlay(); // Komponent yüklendikten sonra otomatik dönüşü başlatın
    }

    return () => {
      clearInterval(interval); // Komponent kaldırıldığında interval'ı temizleyin
    };
  }, [loaded]);

  return (
    <>
      {
        landingPage ?
          <div className="navigation-wrapper w-full h-full space-y-[6px] ">
            <div ref={LandingpageSliderRef} className="keen-slider h-full">
              <KeenSliderLandingpage>
                <div class=" min-h-[90vh]  h-[90vh]  flex flex-row relative ">
                  <div className=' w-full h-full lg:w-1/2 flex flex-col justify-center items-center px-6 space-y-6 lg:space-y-[6px] text-center'>
                     {/* Ana sayfa ilk slide düzenlemeleri buradan yapılacak  */}
                    <h1>Welcome Our Swimming Course</h1>                         
                    <h2 className=" text-black">Learn swimming right way</h2>
                    <div className=' w-fit h-fit p-3 px-6 rounded-full primary'>
                      <p className=' text-white'>Learn More</p>
                    </div>
                  </div>
                  <div className=' hidden lg:flex lg:w-1/2  relative px-6'>
                    <img className="w-full max-w-full max-h-full" src='../assets/images/pool.png' alt="Swimming Course" />  {/* Resimler img componetinin src yolundan değiştiriliyor ve resimler public dosyasında  */}
                  </div>
                </div>
              </KeenSliderLandingpage>
              <KeenSliderLandingpage>
                     {/* Ana sayfa ikinci slide düzenlemeleri buradan yapılacak  */}
                <div class=" min-h-[90vh]  h-[90vh]  flex flex-row relative ">
                  <div className=' hidden lg:flex lg:w-1/2  relative px-6'>
                    <img className="w-full max-w-full max-h-full" src='../assets/images/paralypic.png' alt="Swimming Course" />
                  </div>
                  <div className=' w-full h-full lg:w-1/2 flex flex-col justify-center items-center px-6 space-y-6 lg:space-y-[6px] text-center'>
                    <h1>Share your journey with us</h1>
                    <div className=' w-fit h-fit p-3 px-6 rounded-full primary'>
                      <p className=' text-white'>Learn More</p>
                    </div>
                  </div>
                </div>
              </KeenSliderLandingpage>
              <KeenSliderLandingpage>
                     {/* Ana sayfa üçüncü slide düzenlemeleri buradan yapılacak  */}
                <div class=" min-h-[90vh]  h-[90vh]  flex flex-row relative ">
                  <div className=' w-full h-full lg:w-1/2 flex flex-col justify-center items-center px-6 space-y-6 lg:space-y-[6px] text-center'>
                    <h1>Meet with our trainers</h1>
                    <div className=' w-fit h-fit p-3 px-6 rounded-full primary'>
                      <p className=' text-white'>Learn More</p>
                    </div>
                  </div>
                  <div className=' hidden lg:flex lg:w-1/2  relative px-6'>
                    <img className="w-full max-w-full max-h-full" src='../assets/images/homepic.jpeg' alt="Swimming Course" />
                  </div>
                </div>
              </KeenSliderLandingpage>
            </div>
          </div>
          :
          <>
            {
              data ?
                data.length > 0?
                <div className="navigation-wrapper px-10 w-full h-fit space-y-[6px]">
                  <div ref={sliderRef} className="keen-slider h-40">
                    {
                      data.map((item) => (
                        <KeenSliderItem
                          key={item.id} // Öğelerin benzersiz bir key'e sahip olması önemlidir
                          name={item.username}
                          email={item.email}
                          phone={item.phoneNumber}
                          field={item.field}
                        />
                      ))
                    }
                  </div>
                  {loaded && instanceRef.current && (
                    <>
                      <Arrow

                        left
                        onClick={(e) =>
                          e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                      />

                      <Arrow
                        onClick={(e) =>
                          e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                          currentSlide ===
                          instanceRef.current?.track.details.slides.length - 1
                        }
                      />
                    </>
                  )}
                </div>
                :
                <p>Bu liste boş</p>
                :
                <p>Bu liste boş</p>
            }

          </>
      }
    </>
  )
}

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
