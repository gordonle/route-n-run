import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';

interface DistanceFormProps { setDistance: (a: any) => void }

const DistanceForm: React.FC<DistanceFormProps> = (props) => {
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange"
  });

  const [ data, setData ] = useState();

  const onSubmit = (data: any) => {
    setData(data);
    props.setDistance(data.distance);
    console.log('distance: ', data.distance);
  };

  // TODO: make form compatible with decimal numbers
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'}}>
      <IonItem style={{width: '100%'}}>
        <IonLabel>Distance (km) </IonLabel>
        <Controller
          as={IonInput}
          control={control}
          onChangeName="onIonChange"
          onChange={([selected]) => {
            return selected.detail.value;
          }}
          name='distance'
          placeholder='Enter running distance (max 25km)'
          type='number'
          rules={{
            required: true,
            min: 0,
            max: 25,
          }}
        />
        </IonItem>
      <IonButton
        type='submit'
        disabled={formState.isValid === false}>
        submit
      </IonButton>
    </form>
  );
}

export default DistanceForm
