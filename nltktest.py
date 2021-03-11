from nltk import word_tokenize, pos_tag, sent_tokenize
import re

sample = '''
Once upon a time there were four little Rabbits, and their names
were--

          Flopsy,
       Mopsy,
   Cotton-tail,
and Peter.

They lived with their Mother in a sand-bank, underneath the root of a
very big fir-tree.

'Now my dears,' said old Mrs. Rabbit one morning, 'you may go into
the fields or down the lane, but don't go into Mr. McGregor's garden:
your Father had an accident there; he was put in a pie by Mrs.
McGregor.'

[Illustration]

[Illustration]

'Now run along, and don't get into mischief. I am going out.'

Then old Mrs. Rabbit took a basket and her umbrella, and went through
the wood to the baker's. She bought a loaf of brown bread and five
currant buns.
'''
print(repr(sample))

# Format the sample
combine_whitespace = re.compile(r"\s+")

sample_formatted = sample.replace('[Illustration]', '').replace('\n', ' ').replace('Mr.', 'Mr ').replace('Mrs. ', 'Mrs ')
sample_formatted = combine_whitespace.sub(" ", sample_formatted).strip()

tag_dict = {
    'VB': 'Verb Base',
    'VBD': 'Past Tense',
    'VBG': 'Gerund/Present Participle',
    'VBN': 'Past Participle',
    'VBP': 'Singular Present',
    'VBZ': '3rd Person Singular Present'
}

verbs = []

# Remove line endings
sentences = sent_tokenize(sample_formatted)
for sentence in sentences:
    print("Sentence:") 
    print(repr(sentence))

    sentence_word_tokens = word_tokenize(sentence)
    tags = pos_tag(sentence_word_tokens)

    for tag in tags:
        # Identify the verbs
        if tag[1] in tag_dict.keys():
            verbs.append(tag)

for verb in verbs:
    print(verb[0], tag_dict[verb[1]])
