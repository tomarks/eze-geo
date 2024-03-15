import './card.css';

interface CardProps {
  className?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={'card ' + (className ?? '')}>
      <h2>{title}</h2>
      <>{description && <p>{description}</p>}</>
      {children}
    </div>
  );
};
