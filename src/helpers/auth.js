import {auth} from '../services/firebase';

export function signup(user, email, password) {
    auth().createUserWithEmailAndPassword(email, password).then(function(result) {
        return result.user.updateProfile({
          displayName: user
        })
      }).catch(function(error) {
        console.log(error);
      });
}
  
export function signin(email, password) {
   return auth().signInWithEmailAndPassword(email, password);
}