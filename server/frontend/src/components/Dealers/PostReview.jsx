import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
        window.location.href = window.location.origin+"/dealer/"+id;
    } else {
        setError("Failed to post review. Please try again.");
        setSubmitting(false);
    }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setSubmitting(false);
    }
  }
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if(dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    const init = async () => {
      await Promise.all([get_dealer(), get_cars()]);
      setLoading(false);
    };
    init();
  },[]);

  if (loading) {
    return (
      <div>
        <Header/>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dealer information...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="form_panel">
        <h1 className="review-form-title">{dealer.full_name}</h1>
        <p className="review-form-subtitle">Share your experience with this dealership</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={postreview}>
          <div className="form-group">
            <label htmlFor="review">Your Review</label>
            <textarea 
              id='review' 
              cols='50' 
              rows='7' 
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about your experience..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchase_date">Purchase Date</label>
            <input 
              type="date" 
              id="purchase_date"
              onChange={(e) => setDate(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cars">Car Make and Model</label>
            <select 
              name="cars" 
              id="cars" 
              onChange={(e) => setModel(e.target.value)}
              required
            >
              <option value="" selected disabled hidden>Choose Car Make and Model</option>
              {carmodels.map(carmodel => (
                <option key={carmodel.CarMake+" "+carmodel.CarModel} value={carmodel.CarMake+" "+carmodel.CarModel}>
                  {carmodel.CarMake} {carmodel.CarModel}
                </option>
              ))}
            </select>        
          </div>

          <div className="form-group">
            <label htmlFor="car_year">Car Year</label>
            <input 
              type="number" 
              id="car_year"
              onChange={(e) => setYear(e.target.value)} 
              max={new Date().getFullYear()} 
              min={2015}
              required
            />
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button" onClick={() => window.history.back()}>Cancel</button>
            <button type="submit" className='postreview' disabled={submitting}>
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default PostReview
