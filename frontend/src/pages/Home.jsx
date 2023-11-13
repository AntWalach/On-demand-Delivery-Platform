import React from 'react'
import '../assets/css/customHome.css';
import Navbar from '../components/Navbar';

function Home() {

  return (
    <div>
      <Navbar/>
      <div className="container-fluid">

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="display-4">Delivery destination</h2>
          </div>
        </div>

        <div className="row justify-content-center mt-4">

          <div className="col-2 mx-5">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input stretched-link" type="checkbox" value="" id="defaultCheck1"/>
                  <label className="form-check-label stretched-link" for="defaultCheck1"/>
                </div>
                <h5 className="card-title">Address</h5>
                <p className="card-text">The courier will deliver the parcel directly to the addressee</p>
              </div>
            </div>
          </div>

          <div className="col-2 mx-5">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input stretched-link" type="checkbox" value="" id="defaultCheck2"/>
                  <label className="form-check-label stretched-link" for="defaultCheck2"/>
                </div>
                <h5 className="card-title">Shipping point</h5>
                <p className="card-text">The courier will deliver the parcel at the shipping point</p>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="display-4">Pack size</h2>
          </div>
        </div>

        <div className="row justify-content-center mt-4">

          <div className="col-2 mx-5">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input stretched-link" type="checkbox" value="" id="defaultCheck3"/>
                  <label className="form-check-label stretched-link" for="defaultCheck3"/>
                </div>
                <h5 className="card-title">Small</h5>
                <p className="card-text">max. 10 x 40 x 65</p>
                <p className="card-text">up to 10 kg</p>
                <h5 className="card-text">15 zł</h5>
              </div>
            </div>
          </div>

          <div className="col-2 mx-5">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input stretched-link" type="checkbox" value="" id="defaultCheck4"/>
                  <label className="form-check-label stretched-link" for="defaultCheck4"/>
                </div>
                <h5 className="card-title">Medium</h5>
                <p className="card-text">max. 20 x 40 x 65 cm</p>
                <p className="card-text">up to 20 kg</p>
                <h5 className="card-text">20 zł</h5>
              </div>
            </div>
          </div>

          <div className="col-2 mx-5">
            <div className="card">
              <div className="card-body">
                <div className="form-check">
                  <input className="form-check-input stretched-link" type="checkbox" value="" id="defaultCheck5"/>
                  <label className="form-check-label stretched-link" for="defaultCheck5"/>
                </div>
                <h5 className="card-title">Large</h5>
                <p className="card-text">max. 45 x 40 x 65 cm</p>
                <p className="card-text">up to 30 kg</p>
                <h5 className="card-text">25 zł</h5>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h2 className="display-4">Shipping details</h2>
          </div>
        </div>

        

        <div className="row justify-content-center mt-3 mb-5">

          <form className="w-50">

            <div className="container">

              <div className="row">

              <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Name and surname or company name</label>
              <input type="password" class="form-control" id="exampleInputPassword1"/>
              </div>

              </div>

              <div className="row justify-content-center">

                <div className="col">

                  <div className="row">

                    <div className="col-md-6">

                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share email with anyone else.</div>
                      </div>

                    </div>

                    <div className="col-md-6">
                      <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Phone number</label>
                        <input type="password" class="form-control" id="exampleInputPassword2"/>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="container">

              <div className="row justify-content-center">

                <div className="col">

                  <div className="row">

                    <div className="col-md-6">

                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Zip code</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Town</label>
                        <input type="password" class="form-control" id="exampleInputPassword2"/>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="container">

              <div className="row justify-content-center">

                <div className="col">

                  <div className="row">

                    <div className="col-md-6">
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Street</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div class="mb-3">
                        <label for="exampleInputPassword2" class="form-label">Building number</label>
                        <input type="password" class="form-control" id="exampleInputPassword2"/>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div class="mb-3">
                        <label for="exampleInputPassword3" class="form-label">Apartment number</label>
                        <input type="password" class="form-control" id="exampleInputPassword3"/>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            <div className="text-center"> 
              <button type="submit" className="btn btn-primary btn-lg">Send</button>
            </div>

          </form>

        </div>

      </div>

    </div>
  )
  
}

export default Home