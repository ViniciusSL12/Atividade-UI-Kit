import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import type { ListRenderItemInfo } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useApp, type Reward } from '../state/AppContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Rewards'>;

const RewardsScreen: React.FC<Props> = ({ navigation }) => {
  const { points, rewards, redeemReward } = useApp();

  const renderReward = ({ item }: ListRenderItemInfo<Reward>) => {
    const canRedeem = !item.redeemed && points >= item.cost;
    const status = item.redeemed ? 'success' : canRedeem ? 'warning' : 'basic';
    return (
      <Card style={styles.card} status={status}>
        <View style={styles.cardRow}>
          <View style={styles.cardInfo}>
            <Text category="s1">{item.title}</Text>
            <Text appearance="hint">Custo: {item.cost} pontos</Text>
          </View>
          <View style={styles.cardMeta}>
            <View style={styles.scorePill}>
              <Text category="c1" style={styles.scoreText}>
                {item.cost}
              </Text>
            </View>
            <Button
              size="small"
              status={item.redeemed ? 'basic' : 'success'}
              disabled={!canRedeem}
              onPress={() => redeemReward(item.id)}
            >
              {item.redeemed ? 'Resgatado' : 'Trocar'}
            </Button>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation title="Casa Pontos" subtitle="Suas recompensas" alignment="center" />
      <Layout style={styles.pointsCard} level="2">
        <View style={styles.pointsRow}>
          <Text category="h4">Saldo</Text>
          <View style={styles.scorePill}>
            <Text category="s1" style={styles.scoreText}>
              {points}
            </Text>
          </View>
        </View>
        <Text appearance="hint">Troque seus pontos por benefícios especiais.</Text>
      </Layout>
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button style={styles.backButton} appearance="ghost" onPress={() => navigation.goBack()}>
        Voltar para tarefas
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pointsCard: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FDF2F8',
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  scorePill: {
    backgroundColor: '#FFF0F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  scoreText: {
    color: '#B83280',
  },
  card: {
    borderRadius: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  cardMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  backButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default RewardsScreen;
