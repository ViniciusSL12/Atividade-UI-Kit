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
import { useApp, type Chore } from '../state/AppContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Points'>;

const PointsScreen: React.FC<Props> = ({ navigation }) => {
  const { points, chores, rewards, toggleChore } = useApp();

  const nextReward = React.useMemo(
    () => rewards.filter((reward) => !reward.redeemed).sort((a, b) => a.cost - b.cost)[0],
    [rewards]
  );

  const renderChore = ({ item }: ListRenderItemInfo<Chore>) => (
    <Card style={styles.card} status={item.done ? 'success' : 'basic'}>
      <View style={styles.cardRow}>
        <View style={styles.cardInfo}>
          <Text category="s1">{item.title}</Text>
          <Text appearance="hint">{item.points} pontos</Text>
        </View>
        <Button
          size="small"
          status={item.done ? 'basic' : 'success'}
          onPress={() => toggleChore(item.id)}
        >
          {item.done ? 'Desfazer' : 'Concluir'}
        </Button>
      </View>
    </Card>
  );

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation title="EduHouse" subtitle="Pontos" alignment="center" />
      <Layout style={styles.pointsCard} level="2">
        <View style={styles.pointsRow}>
          <Text category="h4">Pontos</Text>
          <View style={styles.scorePill}>
            <Text category="s1" style={styles.scoreText}>
              {points}
            </Text>
          </View>
        </View>
        <Text appearance="hint">
          {nextReward
            ? `Proxima meta: ${nextReward.title} (${nextReward.cost} pontos)`
            : 'Todas recompensas liberadas'}
        </Text>
      </Layout>
      <FlatList
        data={chores}
        renderItem={renderChore}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button style={styles.rewardsButton} onPress={() => navigation.navigate('Rewards')}>
        Ver recompensas
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
    backgroundColor: '#E6F2FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  scoreText: {
    color: '#1D4ED8',
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
  rewardsButton: {
    margin: 16,
  },
});

export default PointsScreen;
