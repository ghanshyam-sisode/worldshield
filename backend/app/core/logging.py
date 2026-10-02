import logging
import sys

def setup_logging():
    logger = logging.getLogger("worldshield")
    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        '{"timestamp": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}'
    )

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    
    if not logger.handlers:
        logger.addHandler(console_handler)
        
    return logger

logger = setup_logging()
