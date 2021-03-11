from nltktest import get_data
import json

def main(request):
    # Do something with the request maybe?
    return_data = {
        'data': get_data()
    }

    return(json.dumps(return_data))