const Button = ({
  text,
  className,
  onClick,
  iconLeft,
  iconRight,
  ...props
}: {
  text: string;
  onClick: () => void;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}) => {
  return (
    <button
      className={`rounded-md bg-blueDimmer border-transparent p-2 shadow-sm hover:shadow-md hover:bg-blueDefault transition-all ease-in-out	duration-200 cursor-pointer active:bg-blueDimmer active:border-blueDefault border-box flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {iconLeft ? (
        <div className="flex items-center gap-2">{iconLeft}</div>
      ) : null}

      <p className="text-sm text-foregroundDefault">{text}</p>

      {iconRight ? (
        <div className="flex items-center gap-2">{iconRight}</div>
      ) : null}
    </button>
  );
};

export default Button;
