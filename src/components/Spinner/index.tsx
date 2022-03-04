import './index.css';

export interface ISpinnerProps {
  show: Boolean;
  overlay?: Boolean;
}

export default function Spinner({ show, overlay }: ISpinnerProps) {
  if(show) 
    return (
      <>
        {overlay ? 
          <div className='overlay'>
            <div className='loader'></div>
          </div>
          :
          <div className='loader'></div>
        }
      </>
    );
  else
    return <></>
}