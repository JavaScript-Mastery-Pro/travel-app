const InfoPill = ({ text, image }: InfoPillProps) => (
  <figure className="info-pill">
    <img src={image} alt="info icon" />

    <figcaption>{text}</figcaption>
  </figure>
);

export default InfoPill;
