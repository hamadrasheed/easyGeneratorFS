import classes from './ToastMessage.module.css';

export interface IToastErrorMessageProps {
  title: string;
  errors: string[]
}

const ToastErrorMessage = (props: IToastErrorMessageProps) => {
  const { title, errors } = props;
  return (
    <div className={classes.toastWrapper}>
      <div className={classes.toastTitle}>
        {title}
      </div>
      
      <ul className={classes.toastDescriptionWrapper}>
        {errors.map((item, index) => (
          <li key={index} className={classes.toastDescription}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToastErrorMessage;