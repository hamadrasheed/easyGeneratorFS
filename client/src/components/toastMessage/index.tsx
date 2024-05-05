import ToastErrorMessage, { IToastErrorMessageProps } from "./ToastErrorMessage";
import ToastSuccessMessage, { IToastSuccessMessageProps } from "./ToastSuccessMessage";
import { toast } from 'react-toastify';
import classNames from "classnames";
import classes from './ToastMessage.module.css';

export {
  ToastErrorMessage,
  ToastSuccessMessage
}

interface IArguments {
  successProps: IToastSuccessMessageProps,
  errorProps: Omit<IToastErrorMessageProps, 'errors'>
}

export const useToastMessage = (args: IArguments) => {
  const { successProps, errorProps } = args;

  const handleOnSuccess = () => {
    toast(
      <ToastSuccessMessage {...successProps} />, 
      {
        position: 'bottom-right',
        className: classNames(classes.toastContainer, classes.toastContainerSuccess),
        hideProgressBar: true,
        autoClose: 2000
      }
    )
  }

   const handleOnError = (errors: string) => {
    toast(
      <ToastErrorMessage {...errorProps} errors={[errors]} />, 
      {
        position: 'bottom-right',
        className: classNames(classes.toastContainer, classes.toastContainerError),
        hideProgressBar: true,
        autoClose: 4000
      }
    )
   }

  return {
    toastOnSuccess: handleOnSuccess,
    toastOnError: handleOnError
  }
}




// export default ToastSuccessMessage;