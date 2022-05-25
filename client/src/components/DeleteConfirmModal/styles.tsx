import styled from '@emotion/styled';

export const ModalBody = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '100vh',
  minWidth: 260,
  padding: '40px 20px',
  borderRadius: 10,
  backgroundColor: '#f8f8f8',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
  fontWeight: 700,
  p: {
    marginBottom: 20,
  },
  button: {
    width: 80,
    fontWeight: 700,
    backgroundColor: '#fff',
    padding: 10,
    margin: '0 5px',
    borderRadius: 10,
    borderBottom: '2px solid #ff0000',
    transition: '0.5s',
    '&:nth-of-type(2)': {
      borderColor: '#00cc33',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
});