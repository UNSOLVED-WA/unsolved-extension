import styled from '@emotion/styled';

const NavigatorContainer = styled.div`
  width: 60px;
  height: 100%;

  position: absolute;
  border-radius: 15px !important;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  background: #2196f3; /* fallback for old browsers */
  background: linear-gradient(
    to top,
    #f47419,
    #f44336,
    #ff0000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  transition: all 0.3s ease-in-out;

  .logos {
    position: absolute;
    height: 100%;
    width: 60px;
    padding: 10px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: start;
    gap: 10px;
  }

  .texts {
    height: 100%;
    padding: 10px 0;
    opacity: 0;
    flex: 1 1 0;
    transition: all 0.3s ease-out;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: start;
    gap: 10px;

    .unsolved {
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      height: 24px;
      padding: 5px 7.5px;
    }
  }

  .logos > .logo,
  .texts > .text {
    color: #ffffff;
    height: 24px;
    width: 100%;

    font-size: 14px;
    text-align: center;
    font-weight: 600;

    cursor: pointer;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default NavigatorContainer;
