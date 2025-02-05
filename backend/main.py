import json
from flask import Flask, jsonify, request

app = Flask(__name__)

# Carregando dados do JSON na variável 
with open("data.json", "r", encoding="utf-8") as dados:
    acomodacoes = json.load(dados)


#Função para filtragem de cidades
def filtrar_acomodacao_por_cidade(cidade):
   return [
        a for a in acomodacoes if cidade.lower() == a["localizacao"].split(',')[0].strip().lower()
    ]


# GET /acomodacoes or /acomodacoes?cidade=
@app.route('/acomodacoes', methods=['GET'])
def get_acomodacoes():
    cidade_param = request.args.get('cidade')
    if not cidade_param:
        return jsonify(acomodacoes)

    resultado = filtrar_acomodacao_por_cidade(cidade_param)
    if not resultado:
        return jsonify({"erro": f"Não foram encontradas acomodações para '{cidade_param}'"}), 404

    return jsonify(resultado)


# GET /acomodacoes/{id}
@app.route('/acomodacoes/<int:id>', methods=['GET'])
def get_acomodacoes_by_id(id):
    for acomodacao in acomodacoes:
       if acomodacao["id"] == id:
          return jsonify(acomodacao)
    
    return jsonify({"erro": "Acomodação não encontrada"}), 404

# Função para filtrar as acomodacoes pela cidade, utilizando split a partir da vírgula.
def filtrar_acomodacao_por_cidade(cidade):
   return [
        a for a in acomodacoes if cidade.lower() == a["localizacao"].split(',')[0].strip().lower()
    ]