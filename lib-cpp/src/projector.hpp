#ifndef _MAIN_HPP_
#define _MAIN_HPP_

#include "./glm/glm/glm.hpp"
#include <unordered_map>
#include <vector>
#include <memory>

using Position = glm::vec3;

struct Component {
  uint32_t id;
  Position position;
};

class Projector {
private:
  std::unordered_map<uint32_t, Position> components;
  glm::mat4 projection;

public:
  Projector() : projection(1.0f) {}
  ~Projector() = default;

  uint32_t getComponentsCount() const {
    return static_cast<uint32_t>(components.size());
  }

  std::vector<Component> getComponents() const {
    std::vector<Component> result;
    result.reserve(components.size());

    for (const auto &comp : components) {
      result.push_back({comp.first, comp.second});
    }

    return result;
  }

  void fillComponents(const std::vector<Component> &newComponents) {
    this->ensureUnusedCapacity(newComponents.size());

    for (const auto &comp : newComponents) {
      components[comp.id] = comp.position;
    }
  }

  void putComponent(uint32_t id, const Position &position) {
    components[id] = position;
  }

  void ensureUnusedCapacity(uint32_t capacity) {
    components.reserve(components.size() + capacity);
  }

  void setProjection(const glm::mat4 &matrix) {
    projection = matrix;
  }

  void project() {
    volatile float _a = 0.0f;

    for (auto &comp : components) {
      auto const projected = projection * glm::vec4(comp.second, 1.0f);
      _a = projected.x;
    }
  }
};

#endif // _MAIN_HPP_
