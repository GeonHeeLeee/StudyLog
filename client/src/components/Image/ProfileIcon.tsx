import Image from "./Image";
import styles from './ProfileIcon.module.css'

interface Props {
  size: 'small' | 'medium' | 'large';
}

export default function ProfileIcon({size}: Props) {
  return <Image className={`${styles['profile-icon']} ${styles[size]}`}/>
}