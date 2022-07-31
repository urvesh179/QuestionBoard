import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './Context/UserContext';
import { PortfolioProvider } from './Context/PortfolioContext';
import { LandmarkProvider } from './Context/LandmarkContext';
import { ReceiverCategoryProvider } from './Context/ReceiverCategory';
import { EventProvider } from './Context/EventContext';
import { ReceiverProvider } from './Context/ReceiverContext';
import { FoodRequestProvider } from './Context/FoodRequestContext';
import { VolunteerProvider } from './Context/VolunteerContext';
import { DonorProvider } from './Context/DonorContext';
import { DonationProvider } from './Context/DonationContext';
import { LandmarkManagerProvider } from './Context/LandmarkManagerContext';
//localStorage.clear();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <LandmarkProvider>
          <PortfolioProvider>
            <EventProvider>
              <ReceiverCategoryProvider>
                <ReceiverProvider>
                  <FoodRequestProvider>
                    <VolunteerProvider>
                      <DonorProvider>
                        <DonationProvider>
                          <LandmarkManagerProvider>
                            <App />
                          </LandmarkManagerProvider>
                        </DonationProvider>
                      </DonorProvider>
                    </VolunteerProvider>
                  </FoodRequestProvider>
                </ReceiverProvider>
              </ReceiverCategoryProvider>
            </EventProvider>
          </PortfolioProvider>
        </LandmarkProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
