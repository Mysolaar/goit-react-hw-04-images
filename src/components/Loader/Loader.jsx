import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader_wrapper}>
      <RotatingLines
        strokeColor="#507af8"
        strokeWidth="5"
        animationDuration="1"
        width="96"
        visible={true}
      />
    </div>
  );
};