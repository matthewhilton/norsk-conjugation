from nltktest import get_data
import json

def main(request):
    # Get text from body of request
    text = request.get_data()

    return_data = {
        'data': get_data(text)
    }

    return(json.dumps(return_data))