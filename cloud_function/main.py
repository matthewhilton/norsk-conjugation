from nltktest import get_data

def run_func(request):
    # Do something with the request maybe?
    return(get_data())

print(run_func(None))