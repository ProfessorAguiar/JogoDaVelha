import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Share, Alert } from 'react-native';
import React, { useState } from 'react';
export default function TicTacToe() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Jogo da Velha | Nos ajude a divulgar e espalhar nosso trabalhos educacionais brincando.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };



  const [tela, setTela] = useState('menu')
  const [jogadorAtual, setJogadorAtual] = useState('')
  const [tabuleiro, setTabuleiro] = useState([])
  const [jogadasRestantes, setJogadasRestantes] = useState(0)
  const [ganhador, setGanhador] = useState('')
  function iniciaJogo(jogador) {
    setJogadorAtual(jogador)
    setJogadasRestantes(9)
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setTela('jogo')
  }
  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro])
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')
    verificarGanhador(tabuleiro, linha, coluna)
  }
  function verificarGanhador(tabuleiro, linha, coluna) {
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0])
    }
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna])
    }
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0])
    }
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2])
    }
    if ((jogadasRestantes - 1) === 0) {
      return finalizarJogo('')
    }
    setJogadasRestantes((jogadasRestantes - 1))
  }
  function finalizarJogo(jogador) {
    setGanhador(jogador)
    setTela('ganhador')
  }
  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }
  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.v1}>
          <Image
            style={styles.logo}
            source={require('../assets/logoA.png')}
          />
          <Text style={styles.titulo}>Jogo da Velha</Text>

          <Text style={styles.subtitulo}>Selecione o Primeiro jogador</Text>

          <View style={styles.inLineItems}>
            <TouchableOpacity style={styles.boxJogador} onPress={() => iniciaJogo('X')}>
              <Text style={styles.jogadorX}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxJogador} onPress={() => iniciaJogo('O')}>
              <Text style={styles.jogadorO}>O</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => onShare()} style={styles.btCompartilhar}>
          <Text style={styles.Tcompartilhar}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.v1}>
          <Text style={styles.titulo}>Jogo da Velha</Text>
          {
            tabuleiro.map((linha, numeroLinha) => {
              return (
                <View key={numeroLinha} style={styles.inLineItems}>
                  {
                    linha.map((coluna, numeroColuna) => {
                      return (
                        <TouchableOpacity style={styles.boxJogador} key={numeroColuna} onPress={() => jogar(numeroLinha, numeroColuna)} disabled={coluna !== ''}>
                          <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Menu Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare()} style={styles.btCompartilhar}>
          <Text style={styles.Tcompartilhar}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.v1}>
        <Image
            style={styles.logo}
            source={require('../assets/logoA.png')}
          />
          <Text style={styles.titulo}>Jogo da Velha</Text>
          <Text style={styles.subtitulo}>Resultado Final</Text>
        </View>
        <View style={styles.v1}>
        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum Vencedor</Text>
        }
        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>Vencedor</Text>
            <View style={styles.boxJogador} >
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }
        </View>
        <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Menu Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onShare()} style={styles.btCompartilhar}>
          <Text style={styles.Tcompartilhar}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  v1: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 35,
    fontWeight: '800',
    color: '#333',
    margin: 15,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    margin: 20,
  },
  jogadorX: {
    fontSize: 40,
    fontWeight: '500',
    color: '#119BE0',
  },
  jogadorO: {
    fontSize: 40,
    fontWeight: '500',
    color: '#da3f3f',
  },
  boxJogador: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  inLineItems: {
    flexDirection: 'row'
  },
  botaoMenu: {
    marginTop: 80,
    backgroundColor: '#119be0',
    borderRadius: 10,
    padding: 8,
  },
  textoBotaoMenu: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  ganhador: {
    fontSize: 25,
    fontWeight: '800',
    color: '#555',
    marginTop: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  btCompartilhar: {
    marginTop: 10,
  },
  Tcompartilhar: {
    fontWeight: '700',
    color: '#119be0',
    fontSize: 15,
  }
});
