from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

from main import conversation_with_chatbot
from scrape import scrape_website
from embed import embed_data

app = Flask(__name__)

CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define routes
@app.route('/')
def index():
    return 'Welcome to the Flask server!'

@app.route('/api/website', methods=['GET'])
def scrape_website_embed():
    try:
        url = request.args.get('url')
        if url:
            scrape_result = scrape_website(url)
            if scrape_result:
                embed_result = embed_data()
                if embed_result:
                    return jsonify({'msg': 'Success in scraping website'})
            else:
                return jsonify({'error': 'Failure in scraping website'}), 404
        else:
            return jsonify({'error': 'Please Input the website url'}), 404
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500
    
@app.route('/api/chat', methods=['GET'])
def chat_with_bot():
    try:
        user_message = request.args.get('user_message')
        if user_message:
            predict_function = conversation_with_chatbot()
            message = predict_function(user_message)
            if message:
                return jsonify(message)
            else:
                return jsonify({'error': 'Chatbot is not ready now'}), 404
        else:
            return jsonify({'error': 'What do you want'}), 404
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)