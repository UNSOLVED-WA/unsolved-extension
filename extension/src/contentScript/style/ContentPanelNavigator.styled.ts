import styled from '@emotion/styled';

const NavigatorContainer = styled.div`
  width: 60px;
  height: 100%;
  z-index: 100;
  position: absolute;
  border-radius: 15px !important;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  background: #d00000;
  background: linear-gradient(to top, #ff000077, #f44336, #ff0000);

  transition: all 0.3s ease-in-out;

  .naviitem {
    padding: 10px 0;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: start;

    gap: 15px;
  }

  .logos {
    position: absolute;
    width: 60px;
  }

  .texts {
    opacity: 0;
    flex: 1 1 0;
    transition: all 0.3s ease-out;

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

    font-size: 18px;
    text-align: center;
    font-weight: 600;

    cursor: pointer;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default NavigatorContainer;
