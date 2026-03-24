import Map "mo:core/Map";
import Text "mo:core/Text";
import Bool "mo:core/Bool";
import Iter "mo:core/Iter";

actor {
  let dailyTasks = Map.empty<Text, Map.Map<Text, Bool>>();
  let dailyGoals = Map.empty<Text, [Text]>();

  public shared query ({ caller }) func getTaskStates(date : Text) : async [(Text, Bool)] {
    switch (dailyTasks.get(date)) {
      case (null) { [] };
      case (?tasks) { tasks.entries().toArray() };
    };
  };

  public shared ({ caller }) func toggleTask(date : Text, taskID : Text) : async Bool {
    let tasksForDay = switch (dailyTasks.get(date)) {
      case (null) { Map.empty<Text, Bool>() };
      case (?tasks) { tasks };
    };
    let currentState = switch (tasksForDay.get(taskID)) {
      case (null) { false };
      case (?state) { state };
    };
    let newState = not currentState;
    tasksForDay.add(taskID, newState);
    dailyTasks.add(date, tasksForDay);
    newState;
  };

  public shared ({ caller }) func resetTasks(date : Text) : async () {
    dailyTasks.add(date, Map.empty<Text, Bool>());
  };

  public shared ({ caller }) func setDailyGoals(date : Text, goals : [Text]) : async () {
    dailyGoals.add(date, goals);
  };

  public shared query ({ caller }) func getDailyGoals(date : Text) : async [Text] {
    switch (dailyGoals.get(date)) {
      case (null) { [] };
      case (?goals) { goals };
    };
  };
};
