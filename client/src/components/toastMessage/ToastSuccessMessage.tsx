import classes from './ToastMessage.module.css';

export interface IToastSuccessMessageProps {
  title: string;
  description: string;
}

const ToastSuccessMessage = (props: IToastSuccessMessageProps) => {
  const { title, description } = props;

  return (
    <div className={classes.toastWrapper}>
      <div className={classes.toastTitle}>
        {title}
      </div>

      <div className={classes.toastDescription}>
        {description}
      </div>
    </div>
  )
}

export default ToastSuccessMessage;