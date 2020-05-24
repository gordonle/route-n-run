import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
         IonLabel
} from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import MapContainer from '../components/MapContainer';
import DistanceForm from '../components/DistanceForm';
import './Home.css';

const Home: React.FC = () => {
  const [distance, setDistance] = useState();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Running App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='ion-justify-content-center'>
        <MapContainer/>
        <DistanceForm setDistance={setDistance}/>
        <IonLabel>{distance}</IonLabel>
      </IonContent>
    </IonPage>
  );
};
export default Home;
