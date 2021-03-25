

const withClass = (Wrapped, className) => {
    return props => (
        <div className={className}>
            <Wrapped {...props} />
        </div>
    );
};

export default withClass;