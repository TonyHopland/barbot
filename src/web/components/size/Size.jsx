import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSize } from 'components/size/size.actions';


const SizeComponent = ({ sizeData, dispatchSelectSize }) =>
  <div>
    {sizeData.sizes.map(size =>
      <button
        type="button"
        key={size.id}
        onClick={() => dispatchSelectSize(size.id)}
        className={
          sizeData.selectedSizeId === size.id
          ? 'size-button size-button--selected'
          : 'size-button'
        }
        selected={sizeData.selectedSizeId === size.id}
        disabled={sizeData.maxSize < size.id}
      >{size.name}</button>,
    )}
  </div>;

SizeComponent.propTypes = {
  dispatchSelectSize: PropTypes.func.isRequired,
  sizeData: PropTypes.shape({}),
};

const mapStateToProps = ({ size }) => ({
  sizeData: size,
});

const mapDispatchToProps = dispatch => ({
  dispatchSelectSize: id => dispatch(selectSize(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SizeComponent);
