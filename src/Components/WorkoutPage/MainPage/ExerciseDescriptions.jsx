import React, { Component } from "react";
import {Link} from 'react-router-dom';
import logo1 from '../../../assets/ab_roller_1.jpg';
import logo2 from '../../../assets/ab_roller_2.jpg';
import logo3 from '../../../assets/ab_roller_3.jpg';
import logo4 from '../../../assets/ab_roller_4.jpg';
import logo5 from '../../../assets/kettlebell_windmill.png';
import logo6 from '../../../assets/hammer_curl_1.png';
import logo7 from '../../../assets/hammer_curl_2.png';
import logo8 from '../../../assets/incline_curl_1.png';
import logo9 from '../../../assets/incline_curl_2.png';
import logo10 from '../../../assets/air_bike_1.png';
import logo11 from '../../../assets/air_bike_2.png';





class ExerciseDescriptions extends Component {
    render() {
        return (

            <div>
                <h1 id="Descriptions_Header"> Exercise Descriptions</h1>
                <h1 id="Descriptions_Header" className="AR"> Ab Roller</h1>
                <h1 id="Descriptions_Header" className="KBW">Kettlebell Windmill</h1>
                <h1 id="Descriptions_Header" className="AHC">Alternate Hammer Curl</h1>
                <h1 id="Descriptions_Header" className="AIDC">Alternate Incline Dumbell Curl</h1>
                <h1 id="Descriptions_Header" className="AB">Air Bike</h1>
                

                <img id="ab_roller" src={logo1}/>
                <img id="ab_roller" src={logo2}/>
                <img id="ab_roller" src={logo3}/>
                <img id="ab_roller" src={logo4}/>

                <img id="kettlebell_windmill" src={logo5}/>

                <img id="hammer_curl_1" src={logo6}/>
                <img id="hammer_curl_2" src={logo7}/>

                <img id="incline_curl_1" src={logo8}/>
                <img id="incline_curl_2" src={logo9}/>

                <center><img id="air_bike" src={logo10}/>
                <img id="air_bike" src={logo11}/>
                
                </center>
                

                <Link 
                    id="return"
                    to="/workout">
                        Back
                    </Link>

                    <p id="wikiHowAttribute">
                        Images provided by wikiHow.  Please find author credits at the original wikiHow article on <a href="https://www.wikihow.fitness/Use-an-Ab-Roller">How to Use an Ab Roller</a>.  Content on wikiHow can be shared under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons License</a>. 
                        </p>
                    <p id="kettlebellAttribute">
                        <a href="https://www.shutterstock.com/image-vector/kettlebell-windmills-exercise-flat-vector-illustration-1851860914">"Kettlebell Windmills Exercise"</a>, by Lio Putra, licensed under <a href="https://www.shutterstock.com/license">Standard Image License</a>.
                    </p>

                    <p id="AHCAttribute">
                        Images provided by Wikimedia Commons.  Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.en">CC BY-SA 3.0 </a>
                    </p>

                    <p id="AIDCAttribute">
                        Images provided by Wikimedia Commons.  Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.en">CC BY-SA 3.0 </a>
                    </p>

                    <p id="ABAttribute">
                    Images provided by Wikimedia Commons.  Licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.en">CC BY-SA 3.0 </a>
                    </p>

                    


                
            </div>



        );
        
    }

}

export default ExerciseDescriptions;