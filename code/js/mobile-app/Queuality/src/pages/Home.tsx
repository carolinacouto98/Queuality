import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Queuality</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="queues">
            <IonLabel>Queues</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="tickets">
            <IonLabel>Tickets</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="appointments">
            <IonLabel>Appointments</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonContent>
    </IonPage>
  );
};

export default Home;
