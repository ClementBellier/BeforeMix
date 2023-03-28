import "./disk.css";

const Disk = ({ width, position, rotate, outline }) => {
  let diskClassNames = "disk";
  if (rotate) diskClassNames += " disk-rotate";
  if (outline) diskClassNames += " disk-outline";
  return (
    <div
      className={diskClassNames}
      style={{ "--width": width, ...position }}
      aria-hidden="true"
    >
      <span className="disk-groove"></span>
      <span className="disk-groove"></span>
      <span className="disk-groove"></span>
      <span className="disk-groove"></span>
      <span className="disk-groove"></span>
      <span className="disk-groove"></span>
      <span className="disk-center"></span>
      <span className="disk-hole"></span>
    </div>
  );
};
export default Disk;
