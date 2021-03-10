import csv
import os

filename = "verbs_db.csv"
output_filename = "output.csv"

# Try to delete file if exists
if os.path.exists(output_filename):
    # Remove
    os.remove(output_filename)

# Create
with open(output_filename, 'w'): pass

with open(filename, 'r') as csvfile:
    with open(output_filename, 'w', newline='') as outputcsvfile:
        writer = csv.writer(outputcsvfile)
        reader = csv.reader(csvfile)

        writer.writerow(['norsk', 'english', 'tense', 'stem', 'regular'])

        for row in reader:
            # Ignore first line
            if(reader.line_num != 1):

                english_translation = None
                word_form_dict = {}

                # Read it backwards to get the english word first
                for i in reversed(range(0, len(row))):
                    tense_form = row[i]

                    tense = None
                    regular = True
                    isEnglishTranslation = False

                    if i == 0:
                        tense = 'infinitive'
                    elif i == 1:
                        tense = 'present'
                    elif i == 2:
                        tense = 'past'
                    elif i == 3:
                        tense = 'present_perfect'
                    elif i == 4:
                        # This is the english word for the previous 4 tenses
                        english_translation = tense_form
                        isEnglishTranslation = True

                    if not isEnglishTranslation:
                        # * indicates it is not regular
                        if "*" in tense_form:
                            regular = False
                            tense_form = tense_form.replace('* ', '')

                        if tense == 'present_perfect':
                            tense_form = tense_form.replace('har ', '')

                        word_form_dict[tense] = [tense_form, english_translation, regular]
                    
                # Work out the stem (infinitive minus e if e exists on infinitive)
                stem = None
                infinitive = word_form_dict['infinitive']
                if infinitive[0].endswith('e'):
                    stem = infinitive[0][:-1]
                else:
                    stem = infinitive[0]
                word_form_dict['stem'] = stem

                # Get ending (WIP)
                
                
                # Write to output file
                for tense in word_form_dict.keys():
                    print(tense)
                    if tense != 'stem' and "/" not in word_form_dict[tense][0]:
                        writer.writerow([word_form_dict[tense][0], word_form_dict[tense][1], tense, word_form_dict['stem'], word_form_dict[tense][2]])

                print(word_form_dict)

# Finds the distance between two strings
def get_ending(word_stem, word_declined):
    for letter in list(word_declined):
        print(letter)