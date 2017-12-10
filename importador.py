import csv
import sqlite3
from collections import namedtuple

Estado = namedtuple('Estado', ['id', 'nome', 'sigla'])
Cidade = namedtuple('Cidade', ['id', 'nome', 'id_estado'])

conexao = sqlite3.connect('banco.db')
cursor = conexao.cursor()

'''
estados = set()
cidades = set()
'''

def main():
    with open('estados.csv') as estados_file:
        reader = csv.reader(estados_file, delimiter='|')
        for row in reader:
            estado = Estado._make(row)
            print('Inserindo: ', estado)
            cursor.execute('INSERT INTO Estado (id, nome, sigla) VALUES (?, ?, ?)', (estado.id, estado.nome, estado.sigla))

            conexao.commit()
    
    print('---')
    with open('cidades.csv') as cidades_file:
        reader = csv.reader(cidades_file, delimiter='|')
        for row in reader:
            cidade = Cidade._make(row)
            print('Inserindo: ', cidade)
            cursor.execute('INSERT INTO Cidade (id, nome, id_estado) VALUES (?, ?, ?)', (cidade.id, cidade.nome, cidade.id_estado))
            conexao.commit()
    
    conexao.close()

if __name__ == '__main__':
    main()
