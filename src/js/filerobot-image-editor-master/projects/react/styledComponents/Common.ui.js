import styled from 'styled-components';

export const NoClickOverlay = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: wait;
`;

export const NoClickToolbar = styled('div')`
  position: absolute;
  z-index: 999;
  top: 36px;
  left: 0;
  right: 0;
  height: 104px;
  cursor: not-allowed;
`;