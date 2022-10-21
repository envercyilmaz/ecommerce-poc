import styles from "./Icon.style";
import PropTypes from "prop-types";
import BasketIcon from "../../assets/basket.svg";
import CheckboxIcon from "../../assets/checkbox.svg";
import CheckboxSelectedIcon from "../../assets/checkboxSelected.svg";
import RadioIcon from "../../assets/radio.svg";
import RadioSelectedIcon from "../../assets/radioSelected.svg";
import PlusIcon from "../../assets/plusSign.svg";
import SubstractIcon from "../../assets/substractSign.svg";
import ArrowLeftIcon from "../../assets/arrowLeft.svg";
import ArrowRightIcon from "../../assets/arrowRight.svg";

const iconMap = {
  Basket: BasketIcon,
  Checkbox: CheckboxIcon,
  CheckboxSelected: CheckboxSelectedIcon,
  Radio: RadioIcon,
  RadioSelected: RadioSelectedIcon,
  Plus: PlusIcon,
  Substract: SubstractIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon
};

const { Wrapper } = styles;


// onclick method adds pointer cursor
const Icon = ({ name, size=24, style, isClickable, onClick }) => {
  return (
    <Wrapper style={style} isClickable={isClickable} size={size} onClick={onClick}>
      <img src={iconMap[name]} width={size} height={size} />
    </Wrapper>
  );
}

Icon.propTypes = {
  name: PropTypes.string, 
  size: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func
}

export default Icon;