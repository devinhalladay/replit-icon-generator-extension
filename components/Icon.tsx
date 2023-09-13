function Icon({ icon }) {
  return <>{typeof icon === "function" && icon()}</>;
}

export default Icon;