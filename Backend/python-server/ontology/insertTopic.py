import csv
import os

topics = ""
with open('data/topic.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile)
    for row in spamreader:
        if row[0] == "id_topic":
            continue
        

        topic = f"""
    <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/topic-onto#topic{row[0]}">
        <rdf:type rdf:resource="http://www.semanticweb.org/thuha/topic-onto#Topic"/>
        <topic-onto:topicID>topic{row[0]}</topic-onto:topicID>"""

        if row[3] != "":
            for target in row[3].split(','):
                topic += f"""\n\t\t<topic-onto:link>topic{target}</topic-onto:link>"""
        
        topic += "\n\t</owl:NamedIndividual>\n"
        topics += topic

if __name__ == "__main__":
    file_path = os.getcwd() + "/ontology/rdf/topic-onto.rdf"

    with open(file_path, 'r') as file:
        content = file.read()
        
    index_of_insert = content.find('<!-- index of adding -->')
    modified_content = content[:index_of_insert] + topics + content[index_of_insert:]

    with open(file_path, 'w') as file:
        file.write(modified_content)
        