import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useState } from "react";
import ahmedabad from "../../assets/ahmedabad.jpeg"
import surat from "../../assets/surat.jpeg"
import mumbai from "../../assets/mumbai.jpeg"



const Featured = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=ahmedabad,surat,mumbai"
  );

  const cityClicked = (city) => {
    navigate("/hotels", { state: { destination: city, dates, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div
            className="featuredItem"
            onClick={() => {
              cityClicked("ahmedabad");
            }}
          >
            <img
              // src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              src={ahmedabad}
              // src="https://asset.cloudinary.com/dhoozs5nu/3bfe063287dc2d699b07bfa8e556cb01"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ahmedabad</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => {
              cityClicked("surat");
            }}
          >
            <img
              // src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              src={surat}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Surat</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div
            className="featuredItem"
            onClick={() => {
              cityClicked("mumbai");
            }}
          >
            <img
              // src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              src={mumbai}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
