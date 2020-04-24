import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import ModalContainer from '../ModalContainer';
import FormSendTweet from '../FormSendTweet';
import { TWEETS_STORAGE } from '../../utils/contants';

import './SendTweet.scss';


export default function SendTweet(props) {
   const { setToastProps, allTweets } = props;
   
   const [isOpenModal, setIsOpenModal] = useState(false);
   
   const openModal = () => {
      setIsOpenModal(true);
   };

   const closeModal = () => {
      setIsOpenModal(false);
   };

   const sendTweet = (e, formValue) => {
      e.preventDefault();
      const { name, tweet } = formValue;
      let allTweetsArray = [];
      
      if (allTweets) {
         allTweetsArray = allTweets;
      }

      if (!name || !tweet) {
         setToastProps({
            open: true,
            text: "TODOS LOS CAMPOS SON OBLIGATORIOS"
         })
      } else {
         formValue.time = moment();
         allTweetsArray.push(formValue);
         localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
         setToastProps({
            open: true,
            text: "Tweet enviado correctamente"
         })
         closeModal();
      }
      allTweetsArray = [];
   };

   return (
      <div className="send-tweet">
         <Fab
            className="send-tweet__open-modal"
            color="primary"
            arial-label="add"
            onClick={openModal}
         >
            <AddIcon />
         </Fab>

         <ModalContainer
            isOpenModal={isOpenModal}
            closeModal= {closeModal}
         >
            <FormSendTweet sendTweet={sendTweet}/>
         </ModalContainer>
      </div>
   )
}