const ActionButton = ({ onClick, className, icon: Icon, label }) => (
    <button onClick={onClick} className={`action-button ${className}`}>
        <Icon className="icon" />
        {label}
    </button>
);
export default ActionButton;
