from nltk import word_tokenize, pos_tag, sent_tokenize
sentence = "Hun kjøpte et brød med brunt brød og fem currant boller."
sentence_word_tokens = word_tokenize(sentence)
tags = pos_tag(sentence_word_tokens)

print(tags)

tag_dict = {
    'VB': 'Verb Base',
    'VBD': 'Past Tense',
    'VBG': 'Gerund/Present Participle',
    'VBN': 'Past Participle',
    'VBP': 'Singular Present',
    'VBZ': '3rd Person Singular Present'
}

for tag in tags:
    if tag[1] in tag_dict.keys():
        print(tag[0], tag_dict[tag[1]])