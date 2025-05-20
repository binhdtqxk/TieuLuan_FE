import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";

const VerificationModal = ({
  open,
  onClose,
  email,
  verificationCode,
  onChange,
  onResend,
  onVerify,
  loading
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verification Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We've sent a verification code to your email ({email}).
          Please enter the code below to complete your registration.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Verification Code"
          type="text"
          fullWidth
          variant="outlined"
          value={verificationCode}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onResend} disabled={loading}>
          Resend Code
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onVerify} variant="contained" color="primary">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationModal;