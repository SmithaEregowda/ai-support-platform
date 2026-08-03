export const healthCheckController = async (req, res) => {
  try {
    res.status(200).json({
      status: 'Chat Service Check!!',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'Error',
      error: error.message,
    });
  }
};
